<?php

namespace Modules\Auth\Http\Controllers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Laravel\Fortify\Contracts\RegisterResponse;
use Laravel\Fortify\Http\Controllers\RegisteredUserController as FortifyRegisteredUserController;
use Modules\Agent\Entities\Agent;
use Modules\Agent\Entities\AgentDetails;

class RegisteredUserController extends FortifyRegisteredUserController
{
    /**
     * Show the registration view.
     */
    public function index(Request $request)
    {
        cs_set('theme', [
            'title' => 'Register',
            'description' => 'Register',
        ]);

        $countries = Cache::remember('users', 60, function () {
            return DB::table('countries')->get();
        });

        return view('auth::register')->with([
            'countries' => $countries,
        ]);
    }

    /**
     * Create a new registered user.
     */
    public function store(Request $request, CreatesNewUsers $creator): RegisterResponse
    {
        try {
            DB::beginTransaction();

            $agent = new Agent;
            $agent->agent_name = $request->name;
            $agent->agent_email = $request->email;
            $agent->agent_phone = $request->phone;
            $agent->code = uniqueId('agents', 'AGEN');
            $agent->status = 2;
            $agent->save();

            $agent_details = new AgentDetails;
            $agent_details->agent_id = $agent->id;
            $agent_details->owner_code = uniqueId('agent_details', 'OWNER');
            $agent_details->house = $request->house;
            $agent_details->road = $request->road;
            $agent_details->post_office = $request->post_office;
            $agent_details->district = $request->state;
            $agent_details->country_id = $request->country_id;
            $agent_details->zip_code = $request->post_code;
            $agent_details->save();

            $inputUser = [
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request['password']),
                'status' => 'Active',
                'phone' => $request->phone,
                'user_type' => 2,
                'agent_id' => $agent->id,
            ];

            event(new Registered($user = $creator->create($inputUser)));
            $this->guard->login($user);

            //assign Agent role to user
            $user->assignRole('Agent');

            DB::commit();

            return app(RegisterResponse::class);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
