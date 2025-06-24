declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AXIOM_TOKEN: string
      ENV_SLUG: string
      DATABASE_URL: string
      WEBAPP_SUPABASE_CONNECTION_STRING: string
      AUTH_SUPABASE_CONNECTION_STRING: string
    }
  }
}

type EnvOptions = {
  isSecret?: boolean
  isRequired?: boolean
}

const defaultOptions: EnvOptions = {
  isSecret: true,
  isRequired: true,
}

function getEnv(name: string, options: EnvOptions = defaultOptions) {
  const opts = { ...defaultOptions, ...options }

  const source = process.env ?? {}

  const value = source[name as keyof typeof source]

  if (!value && opts.isRequired) {
    throw new Error(`${name} is not set`)
  }

  return value
}

/**
 * Shared envs
 */
export const NODE_ENV = getEnv("NODE_ENV", {
  isSecret: false,
  isRequired: false,
})

/**
 * Database envs
 */
export const DATABASE_URL = getEnv("DATABASE_URL", {
  isSecret: true,
  isRequired: false,
}) || process.env.DATABASE_URL

export const WEBAPP_SUPABASE_CONNECTION_STRING = getEnv("WEBAPP_SUPABASE_CONNECTION_STRING", {
  isSecret: true,
  isRequired: false,
}) || process.env.WEBAPP_SUPABASE_CONNECTION_STRING

export const AUTH_SUPABASE_CONNECTION_STRING = getEnv("AUTH_SUPABASE_CONNECTION_STRING", {
  isSecret: true,
  isRequired: false,
}) || process.env.AUTH_SUPABASE_CONNECTION_STRING
