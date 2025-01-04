'use client'

import PageHeader from '../_components/PageHeader'
import { useMutation, useQuery } from 'urql'
import { useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import { PlusIcon } from 'lucide-react'
import Issue from '../_components/Issue'
import { issuesQuery } from '@/gql/issues_query'
import { createIssueMutation } from '@/gql/create_issue_mutation'
import { deleteIssueMutation } from '@/gql/delete_issue_mutation'
interface Issue {
  id: string
  name: string
  content: string
  status: string
}

const IssuesPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [issueName, setIssueName] = useState('')
  const [issueDescription, setIssueDescription] = useState('')
  const [{ data: deleteData, error: deleteError }, deleteIssue] =
    useMutation(deleteIssueMutation)

  const [{ data, error, fetching }, query_replay] = useQuery({
    query: issuesQuery,
  })

  const [createIssue_result, createIssue] = useMutation(createIssueMutation)

  const onCreate = async (close: Function) => {
    const result = await createIssue({
      input: {
        name: issueName,
        content: issueDescription,
      },
    })
    if (result?.data) {
      setIssueName('')
      setIssueDescription('')
      query_replay()
      close()
    }
  }

  const fn_deleteIssue = async (issueId: string) => {
    console.log('delete', issueId)
    try {
      const result = await deleteIssue({ deleteIssueId: issueId })

      if (result.error) {
        console.error('Error deleting issue:', result.error.message)
        return
      }

      console.log('Issue deleted successfully:', result.data)

      // Refetch issues explicitly
      query_replay({ requestPolicy: 'network-only' })
    } catch (err) {
      console.error('Unexpected error deleting issue:', err)
    }
  }

  return (
    <div>
      <PageHeader title="All issues">
        <Tooltip content="New Issue">
          <button
            className="text-white bg-black p-1 rounded-md"
            onClick={onOpen}
          >
            <PlusIcon size={14} />
          </button>
        </Tooltip>
      </PageHeader>
      {fetching ? (
        <div className="flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {data &&
            data?.issues?.map((issue: Issue) => (
              <div key={issue?.id}>
                <Issue issue={issue} fn_deleteIssue={fn_deleteIssue} />
              </div>
            ))}
        </div>
      )}
      {/* {([] as { id: string }[]).map((issue) => (
        <div key={issue?.id}>
          <Issue issue={issue} />
        </div>
      ))} */}

      <Modal
        size="2xl"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className="text-sm text-black/70">New issue</span>
              </ModalHeader>
              <ModalBody>
                <div>
                  <input
                    autoFocus
                    type="text"
                    className="w-full border-none outline-none focus:outline-none focus:border-none py-2 text-xl text-black/70"
                    placeholder="Issue name"
                    value={issueName}
                    onChange={(e) => setIssueName(e.target.value)}
                  />
                </div>
                <div className="bg-white">
                  <Textarea
                    size="lg"
                    variant="bordered"
                    placeholder="Issue description"
                    className="bg-white"
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    classNames={{
                      inputWrapper: 'bg-white border-none shadow-none p-0',
                      base: 'bg-white p-0',
                      input: 'bg-white p-0',
                      innerWrapper: 'bg-white p-0',
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="border-t">
                <Button variant="ghost" onPress={onOpenChange}>
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  className="bg-black text-white"
                  onPress={() => onCreate(onClose)}
                >
                  Create Issue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default IssuesPage
