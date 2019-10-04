<?php

namespace App\Http\Controllers;

use App\Http\Requests\Setting as SettingRequest;
use App\Http\Requests\Upload as UploadRequest;
use App\Shop;
use OhMyBrew\ShopifyApp\Facades\ShopifyApp;

class SettingsController extends Controller
{
    public function show() {
        abort_if(! $shop = Shop::findByUrl(ShopifyApp::shop()->shopify_domain), 403);

        $settings = $shop->settings->keyBy('name')->toArray();

        return view('settings',
            [
                'enabled' => $settings['enabled']['value'] ?? 'disabled',
                'logo' => $shop->getFirstMediaUrl(ShopifyApp::shop()->shopify_domain, 'logo') ?? '',
                'contact' => $settings['contact']['value'] ?? '101 Facebook Lane, San Francisco',
                'layout' => $settings['layout']['value'] ?? 'single'
            ]
        );
    }

    public function store(SettingRequest $request) {
        abort_if(! $shop = Shop::findByUrl(ShopifyApp::shop()->shopify_domain), 403);

        $shop->settings()->updateOrCreate([
                'shop_id' => $shop->id,
                'name' => 'contact'
            ],[
                'value' => $request->get('contact')
            ])->updateOrCreate([
                'shop_id' => $shop->id,
                'name' => 'enabled'
            ],[
                'value' => $request->get('enabled')
            ])->updateOrCreate([
                'shop_id' => $shop->id,
                'name' => 'layout'
            ],[
                'value' => $request->get('layout')
            ])->updateOrCreate([
                'shop_id' => $shop->id,
                'name' => 'layout'
        ]);
    }

    public function updateLogo(UploadRequest $request) {
        abort_if(! $shop = Shop::findByUrl(ShopifyApp::shop()->shopify_domain), 403);

        $shop->clearMediaCollection(ShopifyApp::shop()->shopify_domain);
        $response =  $shop->addMedia($request->file('logo'))->toMediaCollection(ShopifyApp::shop()->shopify_domain, 's3');

        response()->json(
            [
                'success' => true
            ],
            200);
    }

    public function removeLogo() {
        abort_if(! $shop = Shop::findByUrl(ShopifyApp::shop()->shopify_domain), 403);

        $shop->clearMediaCollection(ShopifyApp::shop()->shopify_domain);

        response()->json(['success' => true], 200);
    }
}
