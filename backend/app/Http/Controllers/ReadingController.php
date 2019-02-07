<?php

namespace App\Http\Controllers;

use App\Reading;
use Illuminate\Http\Request;

class ReadingController extends Controller
{
    public function showAllReadings()
    {
        return response()->json(Reading::all());
    }
}