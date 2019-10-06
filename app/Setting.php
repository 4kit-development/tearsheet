<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['shop_id', 'name', 'value'];

    public function getContactAttribute() {
        if($this->name == 'contact') {
            return $this->value;
        }
    }

    public function getEnabledAttribute() {
        if($this->name == 'enabled') {
            return $this->value;
        }
    }

    public function getLayoutAttribute() {
        if($this->name == 'layout') {
            return $this->value;
        }
    }
}
