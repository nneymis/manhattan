<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api', 'middleware' => 'cors'], function () use ($router) {
    $router->options('readings', ['uses' => 'ReadingController@acceptRequest']);
    $router->options('readings/{id}', ['uses' => 'ReadingController@acceptRequest']);
    $router->get('readings', ['uses' => 'ReadingController@showAllReadings']);
    $router->post('readings', ['uses' => 'ReadingController@create']);
    $router->delete('readings', ['uses' => 'ReadingController@delete']);
    $router->put('readings/{id}', ['uses' => 'ReadingController@update']);
});