<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use OhMyBrew\ShopifyApp\Facades\ShopifyApp;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

class Shop extends Model implements HasMedia
{
    use HasMediaTrait;

    public function scopefindByUrl($query, $url) {
        return $query->where('shopify_domain', $url)->first();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function settings() {
        return $this->hasMany(Setting::Class);
    }

    public function registerMediaConversions(Media $media = null)
    {
        $this->addMediaConversion('logo')
            ->width(400)
            ->nonQueued();
    }
}
