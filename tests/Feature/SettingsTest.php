<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class SettingsTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    function retrieving_root_url_without_shop_url_throws_an_exception()
    {
        $response = $this->get('/');

        $response->assertStatus(403);
    }

    /** @test */
    function retrieving_root_url_without_shop_url_throws_an_exception1()
    {
        $response = $this->get('/');

        $response->assertStatus(403);
    }

}
