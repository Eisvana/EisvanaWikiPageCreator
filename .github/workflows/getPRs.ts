import core from 'npm:@actions/core';
import github from 'npm:@actions/github';
import { RestEndpointMethodTypes } from 'npm:@octokit/plugin-rest-endpoint-methods';

type PRListResponse = RestEndpointMethodTypes['pulls']['list']['response'];

async function listPullRequests(token: string, repoOwner: string, repo: string, state: 'open' | 'closed' | 'all') {
  const octokit = github.getOctokit(token);
  const pullRequests = await octokit.rest.pulls.list({
    repo,
    state,
    owner: repoOwner,
    sort: 'created',
    direction: 'desc',
    per_page: 100,
  });
  return pullRequests;
}

function outputRefs(list: PRListResponse) {
  const prDataList = list.data.map((p) => ({
    ref: p.head.ref,
    number: p.number,
  }));
  console.log(prDataList);
}

try {
  const [repoData, token] = Deno.args;
  const [repoOwner, repo] = repoData.split('/');
  const state = 'open';

  const list = await listPullRequests(token, repoOwner, repo, state);
  outputRefs(list);
} catch (error) {
  core.setFailed(error.message);
}
