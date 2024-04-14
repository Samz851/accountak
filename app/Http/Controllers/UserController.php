<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;


class UserController extends Controller
{
    const X_ACCOUNTAK_ONBOARDING = 'X-ACCOUNTAK-ONBOARDING';
    public function login( Request $request ): Response
    {
        Log::info(self::X_ACCOUNTAK_ONBOARDING, [__LINE__, __FILE__]);
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $user = User::where('id', Auth::user()->id)
                        ->with('organization:id,setup')
                        ->first();
            $token = $user->createToken('api_token');
            $request->session()->regenerate();
            
            $response = response([
                'success' => true, 
                'token' => $token->plainTextToken, 
                'redirectTo' => $user->organization->setup ? "/" : "/options/onboard", 'user' => $user]);
            if ( ! $user->organization->setup )
            {
                return $response->cookie(self::X_ACCOUNTAK_ONBOARDING, !$user->organization->setup);
            }
            return $response;
            // return redirect()->intended(route('home'));
        }
        return response('The provided credentials do not match our records.', 401);
        // return back()->withErrors([
        //     'email' => 'The provided credentials do not match our records.',
        // ]);
    }

    public function isAuthenticated( Request $request ): Response
    {
        return response(['success' => $request->user() ? true : false]);
    }

    public function autologin( Request $request ): Response
    {
        return $request->user() ?
                response('success', 200)
                : response('fail', 401);
    }
}
