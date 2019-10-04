<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'SettingsController@show')->middleware(['auth.shop', 'billable'])->name('home');
Route::get('/proxy/{url}', 'AppProxyController@index')->middleware('auth.proxy');
Route::post('/settings/update', 'SettingsController@store');
Route::post('/settings/logo', 'SettingsController@updateLogo');
Route::post('/settings/logo/remove', 'SettingsController@removeLogo');
