# External Systems Setup

Configuration required outside this codebase to deploy the custom login app.

## Zitadel

### Service User

Create a **service** user for the login app to call Zitadel Session/Settings APIs.

1. **Console > Users > Service Users > New**
   - Username: `svc-auth-app` (or similar)
   - Access Token Type: **PAT** (Personal Access Token)
2. **Generate a PAT** and save the token value (used as `ZITADEL_SERVICE_USER_TOKEN`)
3. **Grant IAM role**: Console > Users > [service user] > Authorizations > New
   - Select **Instance** level (not an organization)
   - Role: **IAM_LOGIN_CLIENT**
   - This role allows the service user to create/manage sessions on behalf of users

> Repeat for each environment (dev, prod) if using separate Zitadel instances.

### Custom Login URI

Tells Zitadel to redirect OIDC login flows to our app instead of the built-in login.

1. **Console > Settings > Login Behavior and Security > Advanced**
   - Set **Login V2 Base URI**: `https://auth.dev.fion-energy.com/ui/v2/login` (dev) or `https://auth.fion-energy.com/ui/v2/login` (prod)

> This is an **instance-level** setting. All applications on this Zitadel instance will use the custom login.

### Allowed Origins (CORS)

The login app makes browser-side requests to the Zitadel API. Without this, requests fail with CORS errors.

1. **Console > Settings > Security > Allowed Origins**
   - Add `https://auth.dev.fion-energy.com` (dev)
   - Add `https://auth.fion-energy.com` (prod)

### Disable User Registration

Registration is controlled at **two levels** — instance and organization. The org-level policy overrides instance.

**Instance level:**
1. Console > Settings > Login Behavior and Security > **User Registration allowed** = off

**Organization level** (if an org-level policy exists, it takes precedence):
- Check via API: `GET /management/v1/policies/login` with `x-zitadel-orgid` header
- If `allowRegister: true` exists at org level, either:
  - **Delete the org policy** to inherit from instance: `DELETE /management/v1/policies/login` with `x-zitadel-orgid` header
  - Or update it: `PUT /management/v1/policies/login` with `allowRegister: false`

> The Zitadel Console may not show org-level login policies in the UI. Use the API to check/fix.

### Redirect URIs

No changes needed. The OIDC redirect URIs in your applications (e.g., fion-analysis) stay the same — they point to Zitadel's callback endpoint, not to the login app. Zitadel handles the redirect chain:

```
App → Zitadel /authorize → Custom Login App → Zitadel /session → Zitadel /callback → App
```

---

## AWS

### ECR Repository

Images are stored in the shared ECR account (`891377298986`).

1. Create the repository:
   ```bash
   aws ecr create-repository --repository-name fion-auth --region eu-central-1 \
     --profile AdministratorAccess-891377298986
   ```

2. Add **cross-account pull policy** so dev (`339712716017`) and prod (`891377357860`) EKS clusters can pull:
   ```bash
   aws ecr set-repository-policy --repository-name fion-auth --region eu-central-1 \
     --profile AdministratorAccess-891377298986 \
     --policy-text '{
       "Version": "2012-10-17",
       "Statement": [
         {
           "Sid": "AllowCrossAccountPull",
           "Effect": "Allow",
           "Principal": {
             "AWS": [
               "arn:aws:iam::339712716017:root",
               "arn:aws:iam::891377357860:root"
             ]
           },
           "Action": [
             "ecr:GetDownloadUrlForLayer",
             "ecr:BatchGetImage",
             "ecr:BatchCheckLayerAvailability"
           ]
         }
       ]
     }'
   ```

### Route 53

Create DNS records pointing to the EKS Traefik load balancer.

| Record | Type | Target | Environment |
|--------|------|--------|-------------|
| `auth.dev.fion-energy.com` | A / CNAME | Dev Traefik LB (same IPs as other dev services) | Dev |
| `auth.fion-energy.com` | A / CNAME | Prod Traefik LB (same IPs as other prod services) | Prod |

> If using external-dns in the cluster, the ingress resource may create the record automatically. Otherwise create manually.

---

## GitHub

### Repository Environments

Create two environments in the repo settings (Settings > Environments):

| Environment | Purpose |
|-------------|---------|
| **Dev** | Used by `build-and-deploy-develop.yaml` |
| **Prod** | Used by `deploy-prod.yaml` |

### Secrets

Each environment needs the following secret:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `FION_AUTH_SVC` | Zitadel service user PAT | Used to create K8s secret `fion-auth-secrets` during deploy |

> The PAT value is different per environment if using separate Zitadel instances (dev vs prod).

---

## Verification Checklist

After all configuration is done:

- [ ] Health check: `curl https://auth.dev.fion-energy.com/ui/v2/login/healthy`
- [ ] Visit login page directly: `https://auth.dev.fion-energy.com/ui/v2/login/loginname`
- [ ] OIDC flow: login from fion-analysis, should redirect to custom login, complete flow, redirect back
- [ ] "Register new user" link should NOT appear on login screen
- [ ] Logo loads correctly (Zitadel branding settings)
- [ ] Logout from fion-analysis ends Zitadel session

### Rollback

Remove the Custom Login URI in Zitadel Console to instantly revert to the built-in login. No code changes needed.
