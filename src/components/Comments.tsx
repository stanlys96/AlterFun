import { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { supabase, Comment } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

type CommentsProps = {
  creatorId: string;
};

export default function Comments({ creatorId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, isWalletConnected } = useAuth();
  const walletAddress = user?.wallet_address;

  useEffect(() => {
    loadComments();
  }, [creatorId]);

  const loadComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('creator_id', creatorId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setComments(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !isWalletConnected || !walletAddress) return;

    setLoading(true);

    const { data: userData } = await supabase
      .from('users')
      .select('username')
      .eq('wallet_address', walletAddress)
      .maybeSingle();

    const displayName = userData?.username || walletAddress.slice(0, 6) + '...' + walletAddress.slice(-4);

    const { error } = await supabase.from('comments').insert({
      creator_id: creatorId,
      user_id: walletAddress,
      user_name: displayName,
      content: newComment.trim(),
    });

    if (!error) {
      setNewComment('');
      loadComments();
    }
    setLoading(false);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-6 h-6 text-[#7E34FF]" />
        <h2 className="text-xl font-bold text-gray-900">
          Comments ({comments.length})
        </h2>
      </div>

      {isWalletConnected ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E34FF]"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!newComment.trim() || loading}
              className="px-6 py-3 bg-[#7E34FF] text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Post
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <p className="text-gray-600">
            Please connect your wallet to post comments
          </p>
        </div>
      )}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#7E34FF] to-[#03EC86] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {comment.user_name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-gray-900">
                    {comment.user_name}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {formatTimeAgo(comment.created_at)}
                </span>
              </div>
              <p className="text-gray-700 ml-10">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
