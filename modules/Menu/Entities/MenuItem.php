<?php

namespace Modules\Menu\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\Menu\Entities\MenuCategory;
use Modules\Menu\Entities\MenuItemSize;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = [];
    
    public function category()
    {
        return $this->belongsTo(MenuCategory::class);
    }

    public function sizes()
    {
        return $this->hasMany(MenuItemSize::class);
    }
}
