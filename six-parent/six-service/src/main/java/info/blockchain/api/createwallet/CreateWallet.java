package info.blockchain.api.createwallet;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import info.blockchain.api.APIException;
import info.blockchain.api.HttpClient;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * This class reflects the functionality documented
 * at https://blockchain.info/api/create_wallet. It allows users to create new wallets
 * as long as their API code has the 'generate wallet' permission.
 */
public class CreateWallet {
    /**
     * Creates a new Blockchain.info wallet.
     *
     * @param serviceURL URL to an instance of service-my-wallet-v3 (with trailing slash)
     * @param password Password for the new wallet. At least 10 characters.
     * @param apiCode  API code with create wallets permission
     * @return An instance of the CreateWalletResponse class
     * @throws APIException If the server returns an error
     */
    public static CreateWalletResponse create (String serviceURL, String password,
        String apiCode) throws IOException, APIException {
        return create(serviceURL, password, apiCode, null, null, null);
    }

    /**
     * Creates a new Blockchain.info wallet. It can be created containing a pre-generated
     * private key or will otherwise generate a new private key.
     *
     * @param serviceURL URL to an instance of service-my-wallet-v3 (with trailing slash)
     * @param password   Password for the new wallet. At least 10 characters.
     * @param apiCode    API code with create wallets permission
     * @param privateKey Private key to add to the wallet (optional, nullable)
     * @param label      Label for the first address in the wallet (optional, nullable)
     * @param email      Email to associate with the new wallet (optional, nullable)
     * @return An instance of the CreateWalletResponse class
     * @throws APIException If the server returns an error
     */
    public static CreateWalletResponse create (String serviceURL, String password,String apiCode,
        String privateKey, String label, String email) throws IOException, APIException {
        Map<String, String> params = new HashMap<String, String>();

        params.put("password", password);
        params.put("api_code", apiCode);
        if (privateKey != null) {
            params.put("priv", privateKey);
        }
        if (label != null) {
            params.put("label", label);
        }
        if (email != null) {
            params.put("email", email);
        }

        String response = HttpClient.getInstance().post(serviceURL, "api/v2/create", params);
        JsonObject jsonObj = new JsonParser().parse(response).getAsJsonObject();

        return new CreateWalletResponse(
            jsonObj.get("guid").getAsString(),
            jsonObj.get("address").getAsString(),
            jsonObj.get("label").getAsString());
    }
}
