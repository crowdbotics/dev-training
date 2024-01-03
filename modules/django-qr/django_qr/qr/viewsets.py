from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
import io
import qrcode
import base64


class TextLikeSerializer(serializers.Serializer):
    text = serializers.CharField()


class QRLikeSerializer(serializers.Serializer):
    qrcode = serializers.CharField()


class QRCodeView(APIView):
    @extend_schema(request=TextLikeSerializer, responses=QRLikeSerializer)
    def post(self, request, *args, **kwargs):
        """
        This function takes text as input and returns Qrcode Image converted into base64 string.
        """
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=4,
            border=4,
        )

        qr.add_data(request.data["text"])
        qr.make(fit=True)
        img = qr.make_image()

        buffered = io.BytesIO()
        img.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        return Response({"qrcode": img_str}, status=status.HTTP_200_OK)
