declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AXIOM_TOKEN: string
      ENV_SLUG: string
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
