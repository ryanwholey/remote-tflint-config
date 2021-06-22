import path from 'path'
import fs from 'fs'

import {Octokit} from '@octokit/rest'

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

  const {data} = <{data: GetContentDataType}>(
    await octokit.rest.repos.getContent({
      owner,
      repo,
      path: path.join(srcPath, srcFilename),
      ref
    })
  )

  const dataBuffer = Buffer.from(data.content, 'base64')

  const configFilePath = path.resolve(dstPath, dstFilename)

  await fs.promises.writeFile(configFilePath, dataBuffer.toString('utf8'))

  return configFilePath
}
