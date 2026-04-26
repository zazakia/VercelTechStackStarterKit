# User Status Management Implementation Plan

## Overview
The current user management system displays user status but lacks dedicated functionality to manage and change user statuses. This plan outlines the implementation of comprehensive user status management features.

## Requirements
1. View current user status (active, inactive, suspended)
2. Change user status individually
3. Change user status in bulk
4. View status change history
5. Add status change reasons
6. Provide status-based user filtering
7. Implement status-based access controls

## Implementation Plan

### 1. Status Management in User Table
- Modify `components/users/user-table.tsx` to:
  - Improve status display with better visual indicators
  - Add quick status change dropdown in table cells
  - Implement status-based row styling
  - Add status filtering options

### 2. Status Change Dialog
- Create a new component: `components/users/status-change-dialog.tsx`
  - Form for selecting new status
  - Text area for status change reason
  - Display user information
  - Show current and new status
  - Include confirmation and cancel actions

### 3. Update User Management Page
- Modify `app/dashboard/users/page.tsx` to:
  - Add status filtering to user filters
  - Handle status change events
  - Update user list after status changes
  - Implement status change history display

### 4. Implement Status Server Actions
- Update server actions in `app/dashboard/users/actions.ts` to:
  - Handle individual status changes
  - Process bulk status changes
  - Validate status transitions
  - Log status change reasons
  - Implement authorization checks

### 5. Database Considerations
- Add status change logging table (optional)
- Implement triggers for status change auditing
- Add indexes for status-based queries
- Consider soft-delete patterns for suspended users

### 6. UI/UX Considerations
- Add visual indicators for different statuses
- Implement status-based color coding
- Provide clear feedback for status changes
- Add tooltips explaining status meanings
- Implement status change confirmation

## Component Structure

```
components/
├── users/
│   ├── status-change-dialog.tsx
│   ├── user-table.tsx (modified)
│   ├── user-filters.tsx (modified)
│   └── users-page.tsx (modified)
└── ui/
    ├── select.tsx (existing shadcn component)
    ├── badge.tsx (existing shadcn component)
    └── alert-dialog.tsx (existing shadcn component)
```

## Status Definitions

### Active
- User can log in and access the system
- All permissions apply
- Default status for new users

### Inactive
- User cannot log in
- Account preserved but disabled
- Can be reactivated

### Suspended
- User cannot log in
- Account preserved but restricted
- Typically for policy violations
- May require admin intervention to reactivate

## Status Change Features

### Individual Status Change
- Quick action in user table
- Detailed dialog for status change
- Reason requirement for suspension
- Confirmation for all changes

### Bulk Status Change
- Select multiple users
- Apply status change to all selected
- Add single reason for all changes
- Confirmation dialog with affected count

### Status Filtering
- Filter users by status
- Multi-select status filtering
- Default filter settings
- Clear status filters option

## Status Change Logic

### Valid Transitions
- Active → Inactive (admin action)
- Active → Suspended (admin action)
- Inactive → Active (admin action)
- Inactive → Suspended (admin action)
- Suspended → Active (admin action, may require reason)
- Suspended → Inactive (admin action)

### Restrictions
- Users cannot change their own status
- Non-admins cannot activate suspended accounts
- Reason required for suspension
- Audit logging for all status changes

## Performance Considerations
1. Efficient querying for status-based filters
2. Caching of status information
3. Batch processing for bulk status changes
4. Indexing for status fields

## Error Handling
1. Network errors during status changes
2. Invalid status transitions
3. Authorization errors
4. Database constraint errors

## Security Considerations
1. Validate user permissions for status changes
2. Prevent self-status changes
3. Log all status changes for audit purposes
4. Implement rate limiting for status changes

## Special Cases
1. Status changes for super_admins
2. Status change notifications
3. Automatic status changes (e.g., inactive after inactivity)
4. Status-based feature access