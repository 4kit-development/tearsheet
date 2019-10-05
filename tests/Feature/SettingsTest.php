<?php

namespace Tests\Feature;

use OhMyBrew\ShopifyApp\Exceptions\MissingShopDomainException;
use Tests\TestCase;

class SettingsTest extends TestCase
{

    /** @test */
    function retrieving_root_url_without_shop_url_throws_an_exception()
    {
        $response = $this->get('/');

        $response->assertStatus(403);
    }

}
