"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Profile } from "@/lib/types";

interface NewConversationModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  currentUserId: string | undefined;
  onConversationCreated: () => void;
}

export default function NewConversationModal({
  isOpen,
  onOpenChange,
  currentUserId,
  onConversationCreated,
}: NewConversationModalProps) {
  const [allUsers, setAllUsers] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Profile[]>([]);
  const [chatName, setChatName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredUsers = allUsers
    .filter(user => user.id !== currentUserId)
    .filter(user =>
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    if (isOpen) {
      fetchAllUsers();
    }
  }, [isOpen]);

  const fetchAllUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) throw error;
      setAllUsers(data || []);
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. " + err.message);
      setAllUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserSelect = (user: Profile) => {
    if (selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleCreateConversation = async () => {
    if (selectedUsers.length === 0) {
      setError("Please select at least one user to start a conversation.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Generate chat name if not provided
      const finalChatName = chatName.trim() || 
        (selectedUsers.length === 1 
          ? `${selectedUsers[0].full_name}`
          : `Group Chat (${selectedUsers.length + 1} members)`);

      // Create the chat
      const { data: chatData, error: chatError } = await supabase
        .from("chats")
        .insert({
          name: finalChatName,
          tags: selectedUsers.length === 1 ? ["Direct"] : ["Group"],
        })
        .select()
        .single();

      if (chatError) throw chatError;

      // Add current user and selected users as participants
      const participants = [
        { chat_id: chatData.id, user_id: currentUserId },
        ...selectedUsers.map(user => ({
          chat_id: chatData.id,
          user_id: user.id,
        })),
      ];

      const { error: participantsError } = await supabase
        .from("chat_participants")
        .insert(participants);

      if (participantsError) throw participantsError;

      // Add initial welcome message
      const { error: messageError } = await supabase
        .from("messages")
        .insert({
          chat_id: chatData.id,
          sender_id: currentUserId,
          content: `Hi ${finalChatName}! 👋`,
          status: "sent",
        });

      if (messageError) throw messageError;

      // Reset form and close modal
      setSelectedUsers([]);
      setChatName("");
      setSearchTerm("");
      onOpenChange(false);
      onConversationCreated();

    } catch (err: any) {
      console.error("Error creating conversation:", err);
      setError("Failed to create conversation. " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] bg-white">
        <DialogHeader>
          <DialogTitle>Start New Conversation</DialogTitle>
          <DialogDescription>
            Select users to start a new chat conversation.
          </DialogDescription>
        </DialogHeader>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="grid gap-4 py-4">
          {/* Chat Name Input */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Chat Name (Optional)
            </label>
            <Input
              placeholder="Enter chat name..."
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
            />
          </div>

          {/* Selected Users */}
          {selectedUsers.length > 0 && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Selected Users ({selectedUsers.length})
              </label>
              <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-gray-50">
                {selectedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                  >
                    <span>{user.full_name}</span>
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-green-600"
                      onClick={() => handleUserSelect(user)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User Search */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Search Users
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Users List */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Available Users
            </label>
            {isLoading && (
              <p className="text-sm text-gray-500">Loading users...</p>
            )}
            <ScrollArea className="h-[200px] w-full rounded-md border p-2">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const isSelected = selectedUsers.find(u => u.id === user.id);
                  return (
                    <div
                      key={user.id}
                      className={`flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer ${
                        isSelected ? "bg-green-50 border border-green-200" : ""
                      }`}
                      onClick={() => handleUserSelect(user)}
                    >
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar_url || undefined} />
                          <AvatarFallback className="text-xs">
                            {user.full_name?.substring(0, 1).toUpperCase() || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{user.full_name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="text-green-600">
                          <UserPlus className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  {searchTerm ? "No users match your search." : "No users available."}
                </p>
              )}
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreateConversation}
            disabled={isLoading || selectedUsers.length === 0}
          >
            {isLoading ? "Creating..." : "Start Conversation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}