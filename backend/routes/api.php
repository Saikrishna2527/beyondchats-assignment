<?php

// use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\ArticleController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Route::get('/test', function () {
//     return response()->json(['status' => 'api working']);
// });

// Route::get('/articles/latest', [ArticleController::class, 'latest']);


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;

Route::get('/test', function () {
    return response()->json(['status' => 'api working']);
});

Route::get('/articles/latest', [ArticleController::class, 'latest']);
Route::post('/articles', [ArticleController::class, 'store']);
// Route::get('/articles', function () {
//     return \App\Models\Article::orderBy('created_at', 'desc')->get();
// });

