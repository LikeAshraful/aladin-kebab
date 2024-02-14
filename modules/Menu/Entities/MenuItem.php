<?php

namespace Modules\Menu\Entities;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
