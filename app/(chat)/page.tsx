import { cookies } from 'next/headers';

import { Chat } from '@/components/chat';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { generateUUID } from '@/lib/utils';
import { DataStreamHandler } from '@/components/data-stream-handler';

export default async function Page() {
  const id = generateUUID();
  let modelId = DEFAULT_CHAT_MODEL;

  try {
    const cookieStore = await cookies();
    const modelIdFromCookie = cookieStore.get('chat-model');
    if (modelIdFromCookie) {
      modelId = modelIdFromCookie.value;
    }
  } catch (err) {
    console.error('🚨 Failed to get cookies:', err);
  }

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        selectedChatModel={DEFAULT_CHAT_MODEL}
        selectedVisibilityType="private"
        isReadonly={false}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
