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
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Título de la tarea
            $table->text('description')->nullable();// Descripción de la tarea
            $table->dateTime('due_date'); // Fecha de entrega
            $table->foreignId('subject_id')->constrained()->onDelete('cascade'); // Relación con asignatura
            $table->timestamps();
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignments');
    }
};
