import { FieldError } from '../generated/graphql';

export function toErrorMap(errors: FieldError[]) {
    const errorMap: Record<string, string> = {};
    errors.forEach(({ field, message }) => {
        errorMap[field] = message;
    });

    return errorMap;
}

// Used 'T' to assert that 'field' is a key of T
export function addServerErrors<T>(
    errors: Record<string, string>,
    setError: (field: keyof T, error: { type: string; message: string }) => void
) {
    return Object.keys(errors).forEach((field) => {
        setError(field as keyof T, {
            type: 'server',
            message: errors[field]
        });
    });
}
