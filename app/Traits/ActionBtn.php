<?php

namespace App\Traits;

trait ActionBtn
{
    public function actionBtn($table = null)
    {
        return '<a href="'.route(config('theme.rprefix').'.edit', $this->id).'" class="btn btn-primary-soft btn-sm me-1" title="Edit"><i class="fa fa-edit"></i></a>'.
            '<a href="#" class="btn btn-danger-soft btn-sm" onclick="delete_modal(\''.route(config('theme.rprefix').'.destroy', $this->id).'\',\''.$table.'\')"  title="Delete"><i class="fa fa-trash"></i></a>';
    }

    public function customerActionBtn($table = null)
    {
        return '<a href="'.route('admin.customer.customer_conversation_history', ['customer_id' => $this->id]).'" class="btn btn-success-soft btn-sm me-1" title="Conversation List"><i class="fa fa-comments"></i></a>'.'<a href="'.route(config('theme.rprefix').'.edit', $this->id).'" class="btn btn-primary-soft btn-sm me-1" title="Edit"><i class="fa fa-edit"></i></a>'.
            '<a href="#" class="btn btn-danger-soft btn-sm" onclick="delete_modal(\''.route(config('theme.rprefix').'.destroy', $this->id).'\',\''.$table.'\')"  title="Delete"><i class="fa fa-trash"></i></a>';
    }

    public function conversationActionBtn($table = null)
    {
        return '<a href="'.route('admin.customer.customer_conversation_logs', ['conversation_id' => $this->id]).'" class="btn btn-success-soft btn-sm me-1" title="Conversation Logs"><i class="fa fa-comments"></i></a>';
    }
}
