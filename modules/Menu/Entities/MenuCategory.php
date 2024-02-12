<?php

namespace Modules\Menu\Entities;

use Modules\Menu\Entities\MenuItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MenuCategory extends Model
{
    use HasFactory;

    protected $fillable = [];
    
    public function menuItems()
    {
        return $this->hasMany(MenuItem::class);
    }
}
