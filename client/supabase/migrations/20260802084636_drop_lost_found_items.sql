/*
# Drop lost_found_items table

## Summary
Removes the `lost_found_items` table created for the cancelled Lost & Found project.

## Changes
- Drops table `lost_found_items` (and its policies/RLS automatically).
*/

DROP TABLE IF EXISTS lost_found_items CASCADE;
