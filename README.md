# Task Management System

Firestor Rules:
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read their own data
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
      
      // Admins can read all users
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Tasks rules
    match /tasks/{taskId} {
      allow read: if request.auth != null && (
        // User is owner
        resource.data.ownerId == request.auth.uid ||
        // User is assigned
        resource.data.assigneeIds.hasAny([request.auth.uid]) ||
        // User is admin
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
      );
      
      allow write: if request.auth != null && (
        // User is owner
        resource.data.ownerId == request.auth.uid ||
        // User is assigned (can update status)
        (resource.data.assigneeIds.hasAny([request.auth.uid]) && 
         request.resource.data.status != null) ||
        // User is admin
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
      );
      
      allow create: if request.auth != null;
    }
    
    // Teams rules
    match /teams/{teamId} {
      allow read: if request.auth != null && (
        // User is member
        resource.data.memberIds.hasAny([request.auth.uid]) ||
        // User is admin
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
      );
      
      allow write: if request.auth != null && (
        // User is team lead/owner
        resource.data.leadId == request.auth.uid ||
        resource.data.ownerId == request.auth.uid ||
        // User is admin
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'
      );
    }
  }
}



Use the secret key in admin login: TASKFLOW_ADMIN_2024_SECRET







