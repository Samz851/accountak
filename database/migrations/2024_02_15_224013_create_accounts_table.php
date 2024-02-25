<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->string('account_name');
            $table->foreignId('account_type')
                ->constrained(table: 'account_types');
            $table->foreignId('parent_account_id')
                ->nullable()
                ->constrained(table: 'accounts');
            $table->foreignId('contact_id')
                ->nullable()
                ->constrained(table: 'contacts');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
