import * as path from 'path'
import * as fs from 'fs'

import {Octokit} from '@octokit/rest'
import * as core from '@actions/core'

type GetContentDataType = {
  content: string
}

interface FetchFileToLocalParameters {
  owner: string
  repo: string
  srcPath: string
  srcFilename: string
  ref: string
  dstPath: string
  dstFilename: string
  token?: string
}

export async function fetchFileToLocal({
  owner,
  repo,
  srcPath,
  srcFilename,
  ref,
  dstPath,
  dstFilename,
  token
}: FetchFileToLocalParameters): Promise<string> {
  const octokit = new Octokit({
    auth: token
  })

  core.debug(
    JSON.stringify({
      owner,
      repo,
      path: path.join(srcPath, srcFilename),
      ref
    })
  )

  const {data} = (await octokit.rest.repos.getContent({
    owner,
    repo,
    path: path.join(srcPath, srcFilename),
    ref
  })) as {data: GetContentDataType}

  const dataBuffer = Buffer.from(data.content, 'base64')

  const configFilePath = path.resolve(dstPath, dstFilename)

  await fs.promises.writeFile(configFilePath, dataBuffer.toString('utf8'))

  return configFilePath
}
