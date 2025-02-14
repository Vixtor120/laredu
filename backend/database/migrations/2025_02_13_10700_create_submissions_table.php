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
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Estudiante que entrega
            $table->foreignId('assignment_id')->constrained()->onDelete('cascade'); // Tarea a entregar
            $table->dateTime('submitted_at')->default(DB::raw('CURRENT_TIMESTAMP')); // Fecha de entrega
            $table->decimal('grade', 5, 2)->nullable(); // Calificación
            $table->timestamps();
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
