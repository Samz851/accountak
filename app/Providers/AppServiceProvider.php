<?php

namespace App\Providers;

use App\Models\Options;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Route;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        Route::model('option', Options::class, function (string $value) {
            return Options::where('id', $value)->firstOr(function () {
                return Options::where('id', Auth::user()->organization->options->id)->first();
            });
        });
    }
}
