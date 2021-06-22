import * as core from '@actions/core'
import {fetchFileToLocal} from './fetchFileToLocal'

async function run(): Promise<void> {
  const [owner, repo] = (core.getInput('source-repo') as string).split('/')

  try {
    core.setOutput(
      'config-path',
      await fetchFileToLocal({
        owner,
        repo,
        srcPath: core.getInput('source-path'),
        srcFilename: core.getInput('source-filename'),
        ref: core.getInput('source-ref'),
        dstPath: core.getInput('destination-path'),
        dstFilename: core.getInput('destination-filename'),
        token: core.getInput('token')
      })
    )
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
