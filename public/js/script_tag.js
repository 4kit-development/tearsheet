/* Sample JavaScript file added with ScriptTag resource.
This sample file is meant to teach best practices.
Your app will load jQuery if it's not defined.
Your app will load jQuery if jQuery is defined but is too old, e.g. < 1.7.
Your app does not change the definition of $ or jQuery outside the app.
Example: if a Shopify theme uses jQuery 1.4.2, both of these statements run in the console will still return '1.4.2'
once the app is installed, even if the app uses jQuery 1.9.1:
jQuery.fn.jquery => "1.4.2"
$.fn.jquery -> "1.4.2"
*/

/* Using a self-executing anonymous function - (function(){})(); - so that all variables and functions defined within
aren’t available to the outside world. */

(function(){

    /* Load Script function we may need to load jQuery from the Google's CDN */
    /* That code is world-reknown. */
    /* One source: http://snipplr.com/view/18756/loadscript/ */

    var loadScript = function(url, callback){

        var script = document.createElement("script");
        script.type = "text/javascript";

        // If the browser is Internet Explorer.
        if (script.readyState){
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
            // For any other browser.
        } else {
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);

    };

    /* This is my app's JavaScript */
    var myAppJavaScript = function($){
        // $ in this scope references the jQuery object we'll use.
        // Don't use jQuery, or jQuery191, use the dollar sign.
        // Do this and do that, using $.
        let product = JSON.parse($('#ProductJson-product-template').html());
        $('head').append('<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">');
        console.log(product);

        var info = {};

        $.ajax({
            method: 'GET',
            url: '/apps/tearsheet/proxy/' + Shopify.shop,
            async: false,
        }).done( function (res) {
            info = res;
        });

        console.log(info);

        if(info.enabled === 'enabled') {
            let htmlButton = ` 
            <button type="submit" class="specsheet shopify-payment-button__button shopify-payment-button__button--unbranded">
  				<span>
                   <i></i> Spec Sheet 
                </span>
            </button>`;

            $('#tear-sheet').html(htmlButton);
        }

        $('#tear-sheet').on('click', 'button', function(e){
            e.preventDefault();
            $('button.specsheet > i').addClass('fa fa-spinner fa-spin');
            $.ajax({
                method: 'POST',
                url: 'https://l3omp3rfyf.execute-api.us-west-2.amazonaws.com/prod/pdf',
                beforeSend: function( xhr ) {
                    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
                },
                contentType: 'application/pdf',
                responseType: 'arraybuffer',
                data: JSON.stringify({
                    "data": {
                        "product": {
                            "logo": info.logo,
                            "title": product.title,
                            "description": product.description,
                            "price": product.price,
                            "image": product.images[0],
                            "contact": info.contact
                        },
                        "template": info.layout
                    }
                }),
                success: function (res) {
                    let binaryString = res;
                    let binaryLen = binaryString.length;

                    let bytes = new Uint8Array(binaryLen);

                    for (let i = 0; i < binaryLen; i++) {
                        let ascii = binaryString.charCodeAt(i);
                        bytes[i] = ascii;
                    }

                    let blob = new Blob([bytes], {type: "application/pdf"});

                    let link = document.createElement('a');

                    link.href = window.URL.createObjectURL(blob);
                    link.download = `${product.id}.pdf`;

                    link.click();

                    $('button.specsheet > i').removeClass('fa fa-spinner fa-spin');
                }
            });
            return;
        });

    };

    /* If jQuery has not yet been loaded or if it has but it's too old for our needs,
    we will load jQuery from the Google CDN, and when it's fully loaded, we will run
    our app's JavaScript. Set your own limits here, the sample's code below uses 1.7
    as the minimum version we are ready to use, and if the jQuery is older, we load 1.9. */
    if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn.jquery) < 1.7)) {
        loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function(){
            jQuery191 = jQuery.noConflict(true);
            myAppJavaScript(jQuery191);
        });
    } else {
        myAppJavaScript(jQuery);
    }

})();
