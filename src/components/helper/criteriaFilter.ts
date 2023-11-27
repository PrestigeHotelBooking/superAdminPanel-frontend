type FilterOperator = 'EQUALS' | 'GT' | 'LT' | 'CONTAINS' | 'BETWEEN' | 'LIKE' // Uppercase operators, including "BETWEEN"

type LogicalOperator = 'AND' | 'OR' // Uppercase logical operators

export interface FilterCriteria {
  field: any
  operator: FilterOperator
  value: any
  logicalOperator?: LogicalOperator // Logical operator to combine criteria
}

export function CriteriaFilterPayload<T>(criteria: FilterCriteria[]): Record<string, any> {
  const payload: Record<string, any> = {}

  criteria.forEach((criterion) => {
    const { field, operator, value, logicalOperator = 'AND' } = criterion // Provide a default value
    const uppercaseOperator = operator.toUpperCase()

    if (!payload[logicalOperator]) {
      payload[logicalOperator] = []
    }

    if (operator === 'BETWEEN' && typeof value === 'object' && 'startDate' in value && 'endDate' in value) {
      // Handle date range filtering with "BETWEEN" operator
      payload[logicalOperator].push({ [uppercaseOperator]: { field, value } })
    } else {
      // Handle other operators
      payload[logicalOperator].push({ [uppercaseOperator]: { field, value } })
    }
  })

  return payload
}
