<?php

namespace App\Http\Controllers;

use App\Models\Options;
use App\Traits\HasFileUploads;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class OptionsController extends Controller
{
    use HasFileUploads;

    const X_ACCOUNTAK_ONBOARDING = 'X-ACCOUNTAK-ONBOARDING';

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response(Options::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info($request->file(), [__LINE__, __FILE__]);
        if ($request->file('logo_file')) {
            $directory = 'logos/'.$request->user()->organization->id;
            $file = $request->file('logo_file');
            if ($fileUploadedData = $this->uploadSingleFile($file, $directory)) {
                $request->merge(['logo' => $fileUploadedData['filepath']]);
            }
        }
        $options = $request->user()->organization->options()->update($request->all());
        $setup = $request->user()->organization->update(['setup' => 1]);

        return response($options)->withoutCookie(self::X_ACCOUNTAK_ONBOARDING);
    }

    /**
     * Display the specified resource.
     */
    public function show(Options $options): Response
    {
        $urlWithQueryString = request()->fullUrl();
        // $optionsFresh = Options::where('id', )
        $anotherOptions = Options::find(1);
        Log::info([$options, $anotherOptions], [__LINE__, __FILE__]);

        return response($options);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Options $options)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Options $options)
    {
        //
    }
}
