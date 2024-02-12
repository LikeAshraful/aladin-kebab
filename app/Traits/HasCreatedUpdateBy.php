<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

trait HasCreatedUpdateBy
{
    public static function bootHasCreatedUpdateBy()
    {
        static::creating(function (Model $model) {
            if (Auth::check()) {
                $model->created_by = Auth::id();
                Log::channel('action')
                    ->info($model->getTable().' Creating by '.Auth::user()->name, [
                        'Model' => $model,
                        'request' => request()->ajax(),
                    ]);
            }

        });

        static::updating(function (Model $model) {
            if (Auth::check()) {
                $model->updated_by = Auth::id();
                Log::channel('action')
                    ->info($model->getTable().' Updating by '.Auth::user()->name, [
                        'Model' => $model,
                    ]);
            }
        });

        static::saving(function (Model $model) {
            if (Auth::check()) {
                $model->updated_by = Auth::id();
            }
        });

        static::deleting(function (Model $model) {
            if (Auth::check()) {
                $model->updated_by = Auth::id();
                Log::info(''.$model->getTable().' Deleted by '.Auth::user()->name, [
                    'Model' => $model,
                ]);
            }
        });

    }
}
