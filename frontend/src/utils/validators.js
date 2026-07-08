// Funções de validação reutilizáveis

/**
 * Remove espaços em branco do início e fim
 */
export const trim = (value) => (typeof value === 'string' ? value.trim() : value);

/**
 * Verifica se o valor é obrigatório (não vazio após trim)
 */
export const required = (value, message = 'Este campo é obrigatório') => {
  const trimmed = trim(value);
  return trimmed === '' || trimmed === null || trimmed === undefined ? message : null;
};

/**
 * Valida e-mail
 */
export const email = (value, message = 'E-mail inválido') => {
  const trimmed = trim(value);
  if (!trimmed) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed) ? null : message;
};

/**
 * Valida comprimento mínimo
 */
export const minLength = (min) => (value, message = `Mínimo de ${min} caracteres`) => {
  const trimmed = trim(value);
  if (!trimmed) return null;
  return trimmed.length >= min ? null : message;
};

/**
 * Valida comprimento máximo
 */
export const maxLength = (max) => (value, message = `Máximo de ${max} caracteres`) => {
  const trimmed = trim(value);
  if (!trimmed) return null;
  return trimmed.length <= max ? null : message;
};

/**
 * Valida telefone brasileiro (formatos aceitos: (011) 99999-9999, (11) 99999-9999, 011999999999 ou 11999999999)
 */
export const telefone = (value, message = 'Telefone inválido') => {
  const trimmed = trim(value);
  if (!trimmed) return null;
  // Limita o tamanho a 20 caracteres
  if (trimmed.length > 20) {
    return 'Telefone deve ter no máximo 20 caracteres';
  }
  // Regex que aceita DDD com ou sem 0 na frente, com ou sem parênteses e hífen
  const telefoneRegex = /^\(?0?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  return telefoneRegex.test(trimmed) ? null : message;
};

/**
 * Valida número mínimo
 */
export const minNumber = (min) => (value, message = `Valor mínimo é ${min}`) => {
  if (value === null || value === undefined || value === '') return null;
  return value >= min ? null : message;
};

/**
 * Valida número máximo
 */
export const maxNumber = (max) => (value, message = `Valor máximo é ${max}`) => {
  if (value === null || value === undefined || value === '') return null;
  return value <= max ? null : message;
};

/**
 * Valida URL (opcional)
 */
export const url = (value, message = 'URL inválida') => {
  const trimmed = trim(value);
  if (!trimmed) return null;
  try {
    new URL(trimmed);
    return null;
  } catch {
    return message;
  }
};

/**
 * Valida CNPJ (opcional)
 */
export const cnpj = (value, message = 'CNPJ inválido') => {
  const trimmed = trim(value);
  if (!trimmed) return null;
  const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
  return cnpjRegex.test(trimmed) ? null : message;
};

/**
 * Executa múltiplas validações em sequência e retorna o primeiro erro
 */
export const validate = (value, validators) => {
  for (const validator of validators) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};
