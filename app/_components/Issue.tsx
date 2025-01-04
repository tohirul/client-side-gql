import React from 'react'
import Status from './Status'
import { useMutation } from '@urql/next'

const Issue = ({
  issue,
  fn_deleteIssue,
}: {
  issue: { id: string; name: string; status: string }
  fn_deleteIssue: Function
}) => {
  const displayId: string = issue.id
    ? issue.id.split('-').pop()?.slice(-3) || ''
    : ''

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await fn_deleteIssue(issue?.id)
  }
  return (
    <div className="px-4 h-[40px] border-b flex items-center hover:bg-slate-50 gap-4">
      <span className="text-sm text-slate-300 w-[80px]">
        {`PAR-${displayId}`.toUpperCase()}
      </span>
      <Status status={issue.status} issueId={issue.id} />
      <span>{issue.name}</span>
      {/* create a button to remove mutation  */}
      <button
        className="ml-auto px-4 py-1 rounded bg-red-200"
        onClick={handleDelete}
      >
        {' '}
        Delete{' '}
      </button>
    </div>
  )
}
export default Issue
