<?php

namespace App\Http\Controllers;

use App\Shop;

class AppProxyController extends Controller
{
    //
    public function index($url) {
        abort_if(! $shop = Shop::findByUrl($url), 403);

        $settings = $shop->settings->keyBy('name')->toArray();
        $media = $shop->getMedia($url);

        return response()->json([
            'enabled' => $settings['enabled']['value'] ?? 'disabled',
            'logo' => $media->isEmpty() ? '' : $media[0]->getFullUrl(),
            'contact' => $settings['contact']['value'] ?? '101 Facebook Lane, San Francisco',
            'layout' => $settings['layout']['value'] ?? 'single'
        ]);
    }
}
