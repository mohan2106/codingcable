#include <bits/stdc++.h>
using namespace std;

map<string,char> mp;

struct Node
{
    char ch;
    Node *left, *right;
    Node(char c)
    {
        ch=c;
        left=NULL;
        right=NULL;
    }

};
struct Node* constructBST(string preorder, int start, int end)
{
    
    if (start > end) {
        return NULL;
    }
    struct Node* node = new Node(preorder[start]);
    if(start == end){
        return node;
    }
    int i;
    int nstar = 0;
    int nchar = 0;
    for (i = start+1; i <= end; i++)
    {
        if (preorder[i]=='*') {
            nstar++;
        }else{
            nchar++;
        }
        if(nchar==nstar + 1){
            break;
        }
    }
    node->left = constructBST(preorder, start + 1, i);
    node->right = constructBST(preorder, i+1, end);
    return node;
}

void store(struct Node *root,string incoding){
    if(root==NULL){
        return;
    }else{
        if(root->left == NULL && root->right == NULL){
            mp[incoding] = root->ch;
            // cout<<(root->ch)<<" "<<incoding<<'\n';
        }else{
            store(root->left,incoding+'0');
            store(root->right,incoding+'1');
        }
    }
}

void decode(string str,string &ans){
    if(str.length()==0){
        return;
    }
    string s = "";
    int i=0;
    for(;i<str.length();i++){
        s+=str[i];
        if(mp.find(s) != mp.end()){
            ans += mp[s];
            break;
        }
    }
    decode(str.substr(i+1),ans);
}


int main()
{
    string preorder="*a**!*dc*rb";
    int n=preorder.size();
    struct Node* root = constructBST(preorder, 0, n - 1);
    store(root,"");
    string str = "0111110010110101001111100100";
    string ans = "";
    decode(str,ans);
    cout<<ans<<"\n";
    return 0;
}