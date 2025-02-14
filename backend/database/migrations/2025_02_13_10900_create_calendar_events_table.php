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
        Schema::create('calendar_events', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Nombre del evento
            $table->text('description')->nullable(); // Descripción opcional
            $table->dateTime('start'); // Fecha y hora de inicio
            $table->dateTime('end'); // Fecha y hora de finalización
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Usuario que crea el evento
            $table->timestamps();
            });
            
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calendar_events');
    }
};
