from django.conf import settings

def admin_style_branding(request):
    return {'ADMIN_STYLE_BRANDING': getattr(settings, 'ADMIN_STYLE_BRANDING', )}