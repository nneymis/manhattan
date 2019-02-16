<?php

namespace App\Http\Controllers;

use App\Reading;
use Illuminate\Http\Request;

class ReadingController extends Controller
{
    public function acceptRequest() 
    {
        $headers = [
            'Access-Control-Allow-Origin'      => '*',
            'Access-Control-Allow-Methods'     => 'POST, GET, OPTIONS, PUT, DELETE',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Max-Age'           => '86400',
            'Access-Control-Allow-Headers'     => 'Content-Type, Authorization, X-Requested-With'
        ];
        
        $response = response()->json('smth');

        foreach($headers as $key => $value)
        {
            $response->header($key, $value);
        }
        
        return $response;
    }

    public function showAllReadings()
    {
        return response()->json(Reading::all());
    }

    public function create(Request $request)
    {
        $reading = Reading::create($request->all());

        return response()->json(Reading::all(), 201);
    }

    public function delete() 
    {
        Reading::orderBy('created_at', 'desc')->first()->delete();
        
        return response()->json(Reading::all(), 200);
    }

    public function update($id, Request $request)
    {
        $reading = Reading::findOrFail($id);
        $reading->update($request->all());

        return response()->json(Reading::all(), 200);
    }
}