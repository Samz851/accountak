<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AccountTypeController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\TaxesController;
use App\Http\Controllers\TransactionsController;
use App\Models\AccountType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/accounts', [AccountController::class, 'index']);
Route::apiResource('/accounts', AccountController::class);
Route::apiResource('/transactions', TransactionsController::class);
Route::apiResource('/taxes', TaxesController::class);
Route::apiResource('/companies', CompanyController::class);
Route::apiResource('/contacts', ContactController::class);
Route::apiResource('/account_types', AccountTypeController::class);
Route::get('/get_parents', [AccountTypeController::class, 'getParents']);
Route::get('/accounts/select', [AccountController::class, 'getSelect']);
