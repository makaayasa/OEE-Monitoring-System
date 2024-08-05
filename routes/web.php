<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\DB;

// Welcome
Route::get('/', function () {
    return view('welcome');
});

// Dashboard Page
Route::get('/dashboard', [DashboardController::class, 'show']);

// Database
Route::get('/api/data-header', [DashboardController::class, 'getDataHeader']);
Route::get('/api/data-linestop', [DashboardController::class, 'getLinestop']);
Route::get('/api/data-produksi', [DashboardController::class, 'getProduksi']);

// Test Database
Route::get('/test-db', function () {
    try {
        $connection = DB::connection()->getPdo();
        return "Successfully connected to the database.";
    } catch (\Exception $e) {
        return "Failed to connect to the database. Error: " . $e->getMessage();
    }
});
