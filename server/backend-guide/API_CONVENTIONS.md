# API Conventions

## Date format
All calendar dates are `YYYY-MM-DD` strings in ISO 8601. Timestamps use ISO 8601 with timezone offset.

## Timezone
The application operates in UTC. Dates stored without time are calendar dates.

## Money and quantities
- Money: `numeric(12,2)` — stored and returned as strings to avoid floating-point loss.
- Quantities: `numeric(12,3)` — stored and returned as strings.
- API responses wrap monetary values in `{ amount: "1234.56", currency: "NGN" }`.

## Units
One item unit per pantry item. Supported: `KG`, `G`, `L`, `ML`, `PIECE`, `PACK`.
A meal ingredient uses the same unit as its pantry item. No unit conversion in the first release.

## IDs
All public record IDs are UUIDs (v4).

## Response shape

### Success
```json
{
  "data": { ... }
}
```

### List with pagination
```json
{
  "data": [ ... ],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 100
  }
}
```

### Validation error (400)
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      { "path": ["email"], "message": "Invalid email address" }
    ]
  }
}
```

### Unauthenticated (401)
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  }
}
```

### Not found (404)
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "The requested resource was not found"
  }
}
```

### Conflict (409)
```json
{
  "error": {
    "code": "EMAIL_EXISTS",
    "message": "A user with this email already exists"
  }
}
```

### Rate limited (429)
```json
{
  "error": {
    "code": "RATE_LIMITED",
    "message": "Too many requests. Retry after 60 seconds."
  }
}
```

### Server error (500)
```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

## Pagination
- `page` and `pageSize` query parameters.
- Default: `page=1, pageSize=20`. Maximum: `pageSize=100`.
- Response includes `meta.page`, `meta.pageSize`, `meta.total`.

## Deletion policy
- A `PantryItem` is soft-deleted or its `currentQuantity` is set to 0. Purchase history is always preserved.
- Deleting a purchase updates the item's `currentQuantity` by reversing the purchase amount (safe recalculation).
- A `MealPlan`, `Meal`, and `MealCompletion` are hard-deleted. Consumption history may be preserved for insights.

## Capacity overflow
A purchase that would exceed `capacityQuantity` returns a `409 CONFLICT` with the current and max quantities.
The client may resend with `override: true` to allow the purchase.

## Meal completion
- A meal may be completed once. Re-completion returns `409 CONFLICT`.
- Completion is atomic: all ingredients are validated before any stock is deducted.
- Undo-completion restores stock and sets `undoneAt`. A completed meal cannot be edited.
