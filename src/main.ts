import * as core from '@actions/core'
import * as os from 'os'

import {fetchFileToLocal} from './fetchFileToLocal'

async function run(): Promise<void> {
  const [owner, repo] = core.getInput('source-repo').split('/')

  throw new Error('foo')
  
  try {
    core.setOutput(
      'path',
      await fetchFileToLocal({
        owner,
        repo,
        srcPath: core.getInput('source-path'),
        srcFilename: core.getInput('source-filename'),
        ref: core.getInput('source-ref'),
        dstPath: core.getInput('destination-path') || os.homedir(),
        dstFilename: core.getInput('destination-filename'),
        token: core.getInput('token')
      })
      
    )
  } catch (error) {
    core.setFailed(error.message)
    
  }
}

run()
