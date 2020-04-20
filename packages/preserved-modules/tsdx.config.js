module.exports = {
  rollup(config, opts) {
    const originalExternalCheck = config.external

    config.external = (id) => {
      if (id === "@beequeueue/data") return false

      return originalExternalCheck(id)
    }

    if (opts.format === 'esm') {
      config = { ...config, preserveModules: true }
      config.output = { ...config.output, dir: 'dist/', entryFileNames: '[name].esm.js' }
      delete config.output.file
    }
    return config
  }
}