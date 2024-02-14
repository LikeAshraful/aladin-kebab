<?php

namespace Modules\Menu\Entities;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItemSize extends Model
{
    use HasFactory;

    protected $fillable = [];

    public function menuItem()
    {
        return $this->belongsTo(MenuItem::class);
    }
}
