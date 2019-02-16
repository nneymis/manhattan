<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reading extends Model
{
    /**
     * mass assignable
     * 
     * @var array
     */
    protected $fillable = [
        'label', 'value', 'unit', 'highestValue'
    ];

    /**
     * excluded from JSON form
     * 
     * @var array
     */
    protected $hidden = [];
}