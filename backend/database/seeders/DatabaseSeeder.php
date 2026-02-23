<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Permissions
        Permission::create(['name' => 'create exams']);
        Permission::create(['name' => 'edit exams']);
        Permission::create(['name' => 'grade exams']);
        Permission::create(['name' => 'take exams']);

        // Create Roles and assign permissions
        $admin = Role::create(['name' => 'admin']);
        
        $teacher = Role::create(['name' => 'teacher']);
        $teacher->givePermissionTo(['create exams', 'edit exams', 'grade exams']);

        $student = Role::create(['name' => 'student']);
        $student->givePermissionTo(['take exams']);

        // Create a default Admin
        $user = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@examshield.ai',
            'role' => 'admin',
            'is_verified' => true,
        ]);
        $user->assignRole($admin);

        // Create a default Teacher
        $user = User::factory()->create([
            'name' => 'Teacher User',
            'email' => 'teacher@examshield.ai',
            'role' => 'teacher',
            'is_verified' => true,
        ]);
        $user->assignRole($teacher);
    }
}
